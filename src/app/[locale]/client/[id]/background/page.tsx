'use server'
import _ from 'lodash'
import Background from '@/components/Background'
import ClientInfoHead from '@/components/ClientInfoHead'
import {
	InterviewAnswer,
	InterviewSchema,
	OptionAnswers,
} from '@/models/schemas/InterviewSchema'
import { readOneInterviewAnswers } from '@/services/dynamoDb/answers'
import { readOneBackgroundText } from '@/services/dynamoDb/background'
import { readOneForm } from '@/services/dynamoDb/forms'
import { readOne } from '@/services/dynamoDb/interviews'
import { readAllSubstances } from '@/services/dynamoDb/substances'
import { NextPage } from 'next'

type Props = {
	params: {
		id: string
	}
}
type SubstancesItem = {
	drugs: Record<string, any>[] | undefined
	success?: boolean
	data?: null
}

const BackgrundPage: NextPage<Props> = async ({ params }) => {
	const { id } = params
	const interview = await readOne(id)
	const answers = await readOneInterviewAnswers(id as string)
	const substancesItem = await readAllSubstances()
	const { form } = await readOneForm('addis')
	const { data } = await readOneBackgroundText('1')
	const backgroundTexts = data?.backgroundTexts

	const generateTexts = (backgroundTexts: any) => {
		const texts: any[] = []
		backgroundTexts.forEach((item: any) => {
			const optionId = answers.find((answer) => answer.qid === item.qid)?.optionId
			const label = getOptionLabelForQuestion(parseInt(item.qid), optionId!, form)
			const text = `<p>${item.text.replace('_', label)}</p>`
			texts.push(text)
		})
		return texts
	}

	function getAnswer(id: string) {
		return _.find(answers, { qid: id })
	}

	function findSubstanceById(substancesItem: any, id: string): string | undefined {
		for (const category of substancesItem.substances[0].drugs) {
			const substance = category.substances.find(
				(substance: { id: string }) => substance.id === id,
			)
			if (substance) {
				return substance.name
			}
		}
		return undefined
	}

	function getOptionLabelForQuestion(questionId: number, optionId: number, form: any) {
		const question = form?.questions.find((q: any) => q.id === questionId)
		if (!question || !question.options) return null

		const item = question.options.find((item: { id: any }) => item.id === optionId)
		if (item.label != null) return item.label.toLowerCase()
		return null
	}

	const generateInjectedSubstancesPart = (interview: InterviewSchema) => {
		const sb: string[] = []
		if (
			!Object.values(interview?.substances.categories).every(
				(category) => category.length === 0,
			)
		) {
			sb.push(`<p>Injicerade preparat:</p>`)

			Object.entries(interview.substances.categories).forEach(
				([category, substances]) => {
					if (substances.some((substance) => substance.injected)) {
						sb.push(
							`<strong style='text-decoration:underline;text-transform:capitalize;'>${category}</strong><br/>`,
						)
						substances.forEach((substance) => {
							if (substance.injected) {
								const substanceName = findSubstanceById(
									substancesItem,
									substance.id,
								)

								sb.push(`${substanceName}`)
							}
						})
						sb.push('<br/>')
					}
				},
			)
		}
		return sb
	}

	const generateSubstancesFormInfoPart = (interview: InterviewSchema) => {
		const sb: string[] = []
		if (interview.substances.favoriteSubstanceMix)
			sb.push(
				`<p>Favorite substances: ${interview.substances.favoriteSubstanceMix}</p><br/>`,
			)
		if (interview.substances.dominatingSubstances)
			sb.push(
				`<p>Dominating substances: ${interview.substances.dominatingSubstances}</p><br/>`,
			)
		if (interview.substances.usedOtherSubstances)
			sb.push(
				`<p>Other used substances: ${interview.substances.usedOtherSubstances}</p><br/>`,
			)
		return sb
	}

	const generateGeneralInfoPart = (interview: InterviewSchema) => {
		let sb = '<p>UTLÅTANDE ANGÅENDE ALKOHOL OCH DROGER<br/>'

		if (interview.created) {
			sb += `Skapad: ${interview.created}<br/>`
		}
		if (interview.uno) {
			sb += `Uno kod: ${interview.uno}</p>`
		}

		return sb
	}

	const generateHowManyKids = () => {
		const answer = answers.find((answer) => answer.qid === '2')
		let arraySb: string[] = []
		if (answer?.checkbox) {
			let string = `<p>`
			string += `klienten har inga barn`
			arraySb.push(string)
		}
		if (answer?.howMany) {
			let string = `<p>`
			string += `klienten har ${answer?.howMany} barn</p>`
			arraySb.push(string)
		}
		if (answer?.ages) {
			let string = `<p>`
			string += `klienten har barn i åldrarna ${answer?.ages}</p>`
			arraySb.push(string)
		}
		return arraySb
	}

	const genereatRelativesAddictions = () => {
		const answer = getAnswer('81')
		let arraySb: string[] = []
		if (answer?.checkbox) {
			let string = `<p>`
			string += `Klienten har förstagradssläktingar som har eller haft problem med alkohol, läkemedel eller andra droger.

			Vem/vilka: ${answer.howMany}`
			arraySb.push(string)
		}
		return arraySb
	}

	const genereatEmployment = () => {
		const answer = getAnswer('5')
		return `<p>Klientens nuvarande sysselsättning är ${answer?.debut}</p>`
	}

	const genereatAlcoholDebut = () => {
		const answer = getAnswer('19')
		return `<p>Klientens alkoholdebut var vid ${answer?.week} års ålder</p>`
	}

	const generateStress = () => {
		const answer = getAnswer('6')
		let arraySb: string[] = []
		arraySb.push('<p>Som olika aktuella stressituationer nämnde klienten följande:')

		answer?.answers.forEach((answer: any) => {
			if (answer.value == 'yes') {
				const label = getOptionLabelForQuestion(6, answer.optionId, form)
				arraySb.push(`<li>${_.upperFirst(_.replace(label, '?', ''))}</li>`)
			}
		})
		arraySb.push('</p>')
		return arraySb
	}

	const generatePTSDScreening = () => {
		const answer = getAnswer('8')
		if (answer !== undefined) {
			if (answer.answers.some((answer) => answer.value === 'yes')) {
				return '<p>Klienten har en positiv PTSD-screening</p>'
			}
		}

		return ''
	}

	const generateGAD = () => {
		const answer = getAnswer('7')
		if (answer?.answers) {
			const pointsMap: { [key: string]: number } = {
				couple_of_days: 1,
				several_days: 2,
				daily: 3,
			}
			let GAD_points = 0
			answer.answers.forEach((ans: OptionAnswers) => {
				if (ans.value && ans.value in pointsMap) {
					GAD_points += pointsMap[ans.value]
				}
			})
			if (GAD_points >= 10) {
				return '<p>Klienten uppfyller kraven för måttlig GAD (generaliserat ångestsyndrom).</p>'
			}
		}
		return ''
	}

	const generateQuestions = () => {
		return `
		<p>Av vilken anledning genomförs intervjun:</p>
		<p>Under intervjun upplevde jag klienten som:</p>
		<p>Tidigare/aktuell behandling:</p>
		<p>Diagnostisk bedömning/diagnos:</p>
		<p>Rekommenderade åtgärder:</p>
		`
	}

	const generateFoodHabits = () => {
		const answer = getAnswer('14')
		const arraySb = ['<p>']

		const answerWithOptionId1 = _.find(answer?.answers, { optionId: 1 })
		const answerWithOptionId2 = _.find(answer?.answers, { optionId: 2 })

		arraySb.push(
			(answerWithOptionId1?.value === 'yes'
				? 'Klienten har under det senaste året ändrat sina matvanor'
				: '') +
				(answerWithOptionId2?.value === 'yes'
					? ', och upplever sig ha tappat kontrollen över hur mycket eller lite som äts'
					: ''),
		)

		arraySb.push('</p>')
		return arraySb
	}

	const generateDepressionScreening = () => {
		const answer = getAnswer('15')
		let arraySb: string[] = []

		if (answer?.debut) {
			arraySb.push(
				`<p>Klientens tidigaste depressionsscreening var vid ${answer.debut} års ålder</p>`,
			)
		}

		if (answer?.lastTime) {
			arraySb.push(
				`<p>Klientens senaste depressionsscreening var vid ${answer.lastTime} års ålder</p>`,
			)
		}

		return arraySb
	}

	const generatePositiveDepressionScreening_1 = () => {
		const answer = getAnswer('9')
		function checkItem(optionId: number, value: string, checkbox: boolean) {
			const item = _.find(answer?.answers, { optionId: optionId })
			if (!item) {
				return false
			}

			return item.value === value && item.checkbox === checkbox
		}
		const optionAnswer1 = checkItem(1, 'yes', true)
		const optionAnswer2 = checkItem(2, 'yes', true)

		function checkFourOrMoreYesAndTrue() {
			const count = _.filter(
				answer?.answers,
				(answer) =>
					answer.optionId !== 1 &&
					answer.optionId !== 2 &&
					answer.value === 'yes' &&
					answer.checkbox,
			).length
			return count >= 4
		}

		if ((optionAnswer1 || optionAnswer2) && checkFourOrMoreYesAndTrue()) {
			return 'Klienten har en positiv depressionsscreening'
		} else {
			return ''
		}
	}

	const html = [
		...generateGeneralInfoPart(interview!),
		...generateInjectedSubstancesPart(interview!),

		...generateTexts(backgroundTexts),

		...genereatEmployment(),
		...generateSubstancesFormInfoPart(interview!),
		...generateHowManyKids(),
		...generateDepressionScreening(),
		...genereatRelativesAddictions(),
		...generateStress(),
		...generateFoodHabits(),
		...genereatAlcoholDebut(),
		...generatePTSDScreening(),
		...generateGAD(),
		...generatePositiveDepressionScreening_1(),
		
		...generateQuestions(),
	]

	const joinedHtml = html.join('')

	return (
		<>
			<ClientInfoHead
				interview={interview as InterviewSchema}
				title={'Utlåtande angående alkohol och droger'}
				info={'Använd genererad text som hjälp vid skrivandet av bakgrund.'}
			/>
			<Background
				interview={interview as InterviewSchema}
				answers={answers as InterviewAnswer[]}
				html={joinedHtml}
			/>
		</>
	)
}

export default BackgrundPage

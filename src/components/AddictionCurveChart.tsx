'use client'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import ClientInfoHead from './ClientInfoHead'
import {
	InterviewAnswer,
	InterviewSchema,
	OptionAnswers,
} from '@/models/schemas/InterviewSchema'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
)
type Props = {
	interview: InterviewSchema
	answers: InterviewAnswer[]
	questions: any
	substances: any
}

const AddictionCurveChart: React.FC<Props> = ({
	interview,
	answers,
	substances,
	questions,
}) => {
	const answersToCheck = [
		'17',
		'18',
		'24',
		'26',
		'35',
		'36',
		'37',
		'40',
		'41',
		'42',
		'43',
		'44',
		'45',
		'46',
		'47',
		'48',
		'49',
		'50',
		'51',
		'52',
		'53',
		'71',
		'72',
		'73',
		'74',
		'75',
		'76',
		'77',
	]

	const getAnswerStatus = (answerItem: OptionAnswers) => {
		if (
			answerItem.selectedOption === 'yes' &&
			answerItem.checkedOption === 'past_year'
		) {
			return 'A'
		} else if (
			answerItem.selectedOption === 'yes' &&
			answerItem.checkedOption === 'past_month'
		) {
			return 'A + M'
		} else if (
			answerItem.selectedOption === 'yes' &&
			(answerItem.checkedOption === '' || answerItem.checkedOption === undefined)
		) {
			return 'L'
		} else return ''
	}

	function sortAndUpdateY(
		data: { x: number; y: number; option: string; qid: string }[],
	): void {
		data.sort((a, b) => a.x - b.x)

		for (let i = 0; i < data.length; i++) {
			data[i].y = -i
		}
	}

	function getLowestY(
		data: { x: number; y: number; option: string; qid: string }[],
	): number {
		let lowestY = Infinity
		for (const item of data) {
			if (item.y < lowestY) {
				lowestY = item.y
			}
		}
		return lowestY
	}

	const dataset: {
		label: string
		data: { x: number; y: number; option: string; qid: string }[]
		borderColor: string
		stepped: string
	}[] = Object.keys(interview?.substances.categories).map((categoryName) => {
		let data: {
			x: number
			y: number
			option: string
			qid: string
			status: string
			categoryName: string
		}[] = []
		let i = 0
		answersToCheck.forEach((questionId) => {
			const filteredInterviewAnswer = answers?.find(
				(answer: InterviewAnswer) => answer.qid === questionId,
			)
			if (filteredInterviewAnswer) {
				if (filteredInterviewAnswer.answers) {
					const optionAnswer = filteredInterviewAnswer.answers.find(
						(answer) => answer.optionId === categoryName,
					)

					if (
						optionAnswer?.debut !== undefined &&
						optionAnswer.debut !== null &&
						optionAnswer.debut !== ''
					) {
						i++
						data.push({
							x: parseInt(optionAnswer.debut),
							y: -i,
							option: optionAnswer.optionId as string,
							qid: questionId,
							status: getAnswerStatus(optionAnswer) as string,
							categoryName: categoryName,
						})
					}
				}
			}
		})

		data.push({ x: -1, y: 0, qid: '0', option: '', status: '', categoryName: '' })
		sortAndUpdateY(data)
		const lowestY = getLowestY(data)
		data.push({
			x: parseInt(interview.age),
			y: lowestY,
			qid: '0',
			option: '',
			status: '',
			categoryName: '',
		})
		const substanceColorCode = substances.substances[0].drugs.find(
			(drug: any) => drug.category === categoryName,
		).colorCode

		const debutLabelQuestion = answers.find((item: any) => item.qid == '26')
		const debutLabelAnswer = debutLabelQuestion?.answers.find(
			(item: any) => item.optionId == categoryName,
		)

		const label = `${
			categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
		} (Debut: ${debutLabelAnswer?.debut})`

		const radius = data.map((point, index) => {
			const isBoundaryPoint = index === 0 || index === data.length - 1
			return isBoundaryPoint ? 0 : 6
		})

		const hitRadius = data.map((point, index) => {
			const isBoundaryPoint = index === 0 || index === data.length - 1
			return isBoundaryPoint ? 0 : 60
		})

		return {
			label: label,
			data: data,
			borderColor: `#${substanceColorCode}`,
			stepped: 'before',
			radius: radius,
			hitRadius: hitRadius,
		}
	})

	const data = {
		labels: Array.from({ length: parseInt(interview.age) + 1 }, (_, i) => i),
		datasets: dataset,
	}

	const options = {
		plugins: {
			tooltip: {
				enabled: false,

				external: function (context: any) {
					const tooltipEl = document.getElementById('chartjs-tooltip')
					if (!tooltipEl) return
					const tooltipModel = context.tooltip
					if (tooltipModel.opacity === 0) {
						tooltipEl!.style.opacity = '1'
						return
					}

					function getBody(bodyItem: any) {
						return bodyItem.lines
					}

					if (tooltipModel.body) {
						const bodyLines = tooltipModel.body.map(getBody)
						const { title, dataPoints } = tooltipModel

						const activeQuestions: QuestionSchema[] = dataPoints
							.map((dataPoint: any) => {
								const { qid: modelQid } = dataPoint.raw
								return questions.find((item: any) => item.id == modelQid)
							})
							.filter(
								(question: QuestionSchema | undefined) => question !== undefined,
							)

						const innerHtml = `<div>${bodyLines
							.map((body: string, i: number) => {
								const { qid, status, y, categoryName } = dataPoints[i].raw

								const stringModelY = y.toString().substring(1)
								const colors = tooltipModel.labelColors[i]
								const tooltipStyleEl = `
									display: block;
									border-radius: 5px;
									padding: 10px;
									text-transform: capitalize
								`
								const propStyleEl =
								`style="
									display: inline-block;
									margin: 0 5px;
									padding: 4px;
									border-radius: 5px;"
									`
								const toolTipHtml = `
								<div style="${tooltipStyleEl}">
									<div style="
										background-color:${colors.borderColor};
										border-radius: 50px;
										padding: 10px;
										height: 2px;
										display: inline-block;
										margin: 0px 7px -3px 5px"
									</div>
								</div>
									${categoryName}
									<div>
										<div ${propStyleEl}><div style="font-size: 13px; display: inline-block">Fråga:</div> ${qid}</div>
										<div ${propStyleEl}><div style="font-size: 13px; display: inline-block">Antal:</div> ${stringModelY}</div>
										<div ${propStyleEl}><div style="font-size: 13px; display: inline-block">Ålder:</div> ${title}</div>
										<div ${propStyleEl}><div style="font-size: 13px; display: inline-block">Status:</div> ${status}</div>
									</div>
								</div>`
								return `<div>${toolTipHtml}</div>`
							})
							.join('')}</div>`

						const questionHtml = `<div>${activeQuestions
							.map((question, i: number) => {
								const colors = tooltipModel.labelColors[i]
								const style = `display: block; border-radius: 5px; padding: 5px; margin: 1rem 0;`
								const toolTipHtml = `
								<div style="${style}">
									<div style="background-color:${colors.borderColor};
										border-radius: 50px;
										padding: 10px;
										height: 2px;
										display: inline-block;
										margin: 0px 7px -3px 5px;"
									>
									</div>
									${question.text}
								</div>`
								return `<div>${toolTipHtml}</div>`
							})
							.join('')}</div>`

						const questionContainer = document.getElementById('question-container')
						const tableRoot = tooltipEl.querySelector('div')
						if (questionContainer) questionContainer.innerHTML = questionHtml
						if (tableRoot) tableRoot.innerHTML = innerHtml
					}
				},
			},
		},
		elements: {
			point: {     
				radiusWidth: 4,
				hoverRadius: 5,
				hoverBorderWidth: 3,
			},
		},
		scales: {
			y: {
				suggestedMin: -30,
				suggestedMax: 0,
				ticks: {
					callback: function (value: any) {
						let stringValue: string = value.toString()
						if (stringValue === '0') return '0'
						return stringValue.substring(1)
					},
					stepSize: 1,
				},
			},
		},
	}

	return (
		<>
			<ClientInfoHead
				interview={interview as InterviewSchema}
				title={'Beroendekurva'}
				info={'Information: A=Aktuellt, L=Livstid, M=Senaste månaden'}
			/>
			<div className='container relative my-3'>
				{data && <Line data={data} options={options} />}

				<div className='absolute left-12 bottom-12 p-3' id='chartjs-tooltip'>
					<div className='black bg-white border border-black rounded'></div>
				</div>
			</div>
			<div className='container'>
				<div className='my-2' id='question-container'></div>
			</div>
		</>
	)
}

export default AddictionCurveChart

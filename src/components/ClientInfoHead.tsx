'use client'
import Image from 'next/image'
import logo from '../../public/static/addis_logo.png'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { InterviewSchema } from '@/models/schemas/InterviewSchema'

interface Props {
	interview: InterviewSchema
	title: string
	info: string
}

const ClientInfoHead: React.FC<Props> = ({ interview, title, info }) => {
	const params = useParams()
	const { id } = params

	if (interview == null) {
		return (
			<div className='flex justify-center m-3 p-3'>
				404 - Could not find an interview with id {id}
			</div>
		)
	}

	return (
		<>
			<div className='container mt-4'>
				<Link
					className='border rounded-md text-black text-sm p-2 inline-flex items-center bg-green-300 hover:bg-green-400 no-underline'
					href={`/client/${id}`}
				>
					<i className='bi bi-chevron-left me-1 text-xs'></i>
					Tillbaka till klientsidan
				</Link>
				<div className='flex justify-between my-3'>
					<h2 className='text-2xl'>{title}</h2>
					<Image src={logo} width={250} alt='addis' className='block' />
				</div>
				<div className='grid grid-cols-2 gap-2 w-72 mt-3'>
					<div className='font-bold'>UNO:</div>
					<div>{interview.uno}</div>
					<div className='font-bold'>Datum:</div>
					<div>{interview.created}</div>
					<div className='font-bold'>Intervjuare:</div>
					<div>{interview.interviewer}</div>
				</div>
				{info !== null && <p className='mt-2 text-sm'>{info}</p>}
			</div>
		</>
	)
}

export default ClientInfoHead

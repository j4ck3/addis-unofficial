import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { InterviewSchema } from '@/models/schemas/InterviewSchema'
import Link from 'next/link'
import { InterviewTableContextMenu } from './InterviewTableContextMenu'

interface Props {
	interviews: InterviewSchema[]
}
const InterviewTable2: React.FC<Props> = ({ interviews }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>UNO-kod</TableHead>
					<TableHead>Datum</TableHead>
					<TableHead>Intervjuare</TableHead>
					<TableHead>Formulär Typ</TableHead>
					<TableHead>Status</TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{interviews.map((item, index) => (
					<TableRow
						key={index}
						className={`${index % 2 === 0 ? '' : 'bg-slate-100'}`}
					>
						<TableCell className='font-medium'>{item.uno}</TableCell>
						<TableCell>{item.created}</TableCell>
						<TableCell className='capitalize'>{item.interviewer}</TableCell>
						<TableCell className='capitalize'>{item.formType}</TableCell>
						<TableCell className='capitalize'>{item.status}</TableCell>
						<TableCell className='text-right'>
							<InterviewTableContextMenu id={item.id} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
export default InterviewTable2

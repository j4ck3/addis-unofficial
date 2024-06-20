import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuSeparator,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import Link from 'next/link'

import React from 'react'

type props = {
	id: string
}

export const InterviewTableContextMenu: React.FC<props> = ({ id }) => {
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<Link
					className='bg-green-500 py-1 px-3 text-white no-underline rounded'
					href={`/client/${id}`}
				>
					Öppna klientsida
				</Link>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>
					<Link
						className='no-underline text-black capitalize'
						href={`/client/${id}/background`}
					>
						öppna intervju
					</Link>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem>
					<Link
						className='no-underline text-black capitalize'
						href={`/interview/${id}/question/1`}
					>
						Bakgrund
					</Link>
				</ContextMenuItem>
				<ContextMenuItem>
					<Link
						className='no-underline text-black capitalize'
						href={`/interview/${id}/question/1`}
					>
						öppna intervju
					</Link>
				</ContextMenuItem>
				<ContextMenuItem>
					<Link
						className='no-underline text-black capitalize'
						href={`/interview/${id}/question/1`}
					>
						öppna intervju
					</Link>
				</ContextMenuItem>
				<ContextMenuItem>
					<Link
						className='no-underline text-black capitalize'
						href={`/interview/${id}/question/1`}
					>
						öppna intervju
					</Link>
				</ContextMenuItem>
				<ContextMenuSub>
					<ContextMenuSubTrigger inset>diagnos checklista</ContextMenuSubTrigger>
					<ContextMenuSubContent className='w-48'>
						<ContextMenuItem>DSM-5</ContextMenuItem>
						<ContextMenuSeparator />
						<ContextMenuItem>ICD-10 beroende</ContextMenuItem>
						<ContextMenuItem>ICD-10 skadligt bruk</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuGroup>
					<ContextMenuSeparator />
					<ContextMenuItem>redigera</ContextMenuItem>{' '}
					<ContextMenuItem className='bg-red-400'>ta bort</ContextMenuItem>
				</ContextMenuGroup>
			</ContextMenuContent>
		</ContextMenu>
	)
}

{
	/* <ContextMenu>
<ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
  Right click here
</ContextMenuTrigger>
<ContextMenuContent className="w-64">
  <ContextMenuItem inset>
    Back
    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
  </ContextMenuItem>
  <ContextMenuItem inset disabled>
    Forward
    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
  </ContextMenuItem>
  <ContextMenuItem inset>
    Reload
    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
  </ContextMenuItem>
  <ContextMenuSub>
    <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
    <ContextMenuSubContent className="w-48">
      <ContextMenuItem>
        Save Page As...
        <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>Create Shortcut...</ContextMenuItem>
      <ContextMenuItem>Name Window...</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>Developer Tools</ContextMenuItem>
    </ContextMenuSubContent>
  </ContextMenuSub>
  <ContextMenuSeparator />
  <ContextMenuCheckboxItem checked>
    Show Bookmarks Bar
    <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
  </ContextMenuCheckboxItem>
  <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
  <ContextMenuSeparator />
  <ContextMenuRadioGroup value="pedro">
    <ContextMenuLabel inset>People</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuRadioItem value="pedro">
      Pedro Duarte
    </ContextMenuRadioItem>
    <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
  </ContextMenuRadioGroup>
</ContextMenuContent>
</ContextMenu> */
}

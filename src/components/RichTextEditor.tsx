'use client'
import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

type Props = {
	html: string
}


const RichTextEditor:React.FC<Props> = ({html}) => {
	const handleEditorChange = (content: any, editor: any) => {}
	return (
		<Editor
			apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
			initialValue={html}
			init={{
				height: 500,
				menubar: false,
				plugins: [
					'advlist autolink lists link image',
					'charmap print preview anchor help',
					'searchreplace visualblocks code',
					'insertdatetime media table paste wordcount',
				],
				toolbar:
					'undo redo | formatselect | bold italic underline | \
              fontsizeselect | alignleft aligncenter alignright | \
              bullist numlist',
			}}
			onEditorChange={handleEditorChange}
		/>
	)
}

export default RichTextEditor

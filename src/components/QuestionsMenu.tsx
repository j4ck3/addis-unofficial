'use client'
import { QuestionSchema } from '@/models/schemas/QuestionSchema'
import clsx from 'clsx'
import Link from 'next/link'
import { useParams, useRouter, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

interface Props {
   questions: QuestionSchema[]
}

const QuestionsMenu: React.FC<Props> = ({ questions }) => {
   const params = useParams()
   const router = useRouter()
   const pathname = usePathname()
   const isOnEndPage = pathname.endsWith('end')
   const { id, questionId } = params
   const numberQuestionId = parseInt(questionId as string)
   useEffect(() => {
      const container = document.getElementById('QuestionsMenu')
      const handleScroll = () => {
         if (container) {
            localStorage.setItem(
               'horizontalScrollPosition',
               String(container.scrollLeft),
            )
         }
      }
      if (container) {
         container.addEventListener('scroll', handleScroll)
         const storedScrollPosition = localStorage.getItem(
            'horizontalScrollPosition',
         )
         if (storedScrollPosition) {
            container.scrollLeft = parseInt(storedScrollPosition, 10)
         }
      }

      return () => {
         if (container) {
            container.removeEventListener('scroll', handleScroll)
         }
      }
   }, [])
   const handleNextButtonClick = () => {
      if (numberQuestionId === questions.length) {
         router.push(`/interview/${id}/question/end`)
      } else {
         router.push(`/interview/${id}/question/${numberQuestionId + 1}`)
      }
   }

   return (
      <>
         <Link
            className='border rounded-md text-black text-sm p-2 inline-flex items-center bg-green-300 hover:bg-green-400 no-underline'
            href={`/client/${id}`}
         >
            <i className='bi bi-chevron-left me-1 text-xs'></i>Tillbaka till
            klientsidan
         </Link>
         <div className='flex justify-between space-x-2 my-8'>
            <Link
               className='w-14 h-14 border rounded-md text-black p-4 inline-flex items-center bg-green-300 hover:bg-green-400 mb-3'
               href={`/interview/${id}/question/${numberQuestionId - 1}`}
            >
               <i className='bi bi-chevron-left'></i>
            </Link>
            <div
               id='QuestionsMenu'
               className='overflow-auto space-x-3 flex items-center w-full'
            >
               {questions.map((question, index) => (
                  <Link
                     href={`/interview/${id}/question/${question.id}`}
                     key={index}
                     className={clsx(
                        'border rounded-md text-black h-14 p-4 inline-flex items-center no-underline hover:bg-green-300 mb-3',
                        {
                           'bg-green-400': questionId === `${question.id}`,
                        },
                     )}
                  >
                     {question.id}
                  </Link>
               ))}
               <Link
                  className={clsx(
                     'border rounded-md text-black h-14 p-4 inline-flex items-center no-underline hover:bg-green-300 mb-3',
                     {
                        'bg-green-400': isOnEndPage,
                     },
                  )}
                  href={`/interview/${id}/question/end`}
               >
                  Avsluta
               </Link>
            </div>
            <button
               onClick={handleNextButtonClick}
               className='w-14 h-14 border rounded-md text-black p-4 inline-flex items-center bg-green-300 hover:bg-green-400 mb-3'
            >
               <i className='bi bi-chevron-right'></i>
            </button>
         </div>
      </>
   )
}

export default QuestionsMenu

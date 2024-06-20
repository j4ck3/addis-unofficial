'use server'

import { revalidatePath } from 'next/cache'

export default async function revalidatePathServerAction(path: string) {
	revalidatePath(path)
}

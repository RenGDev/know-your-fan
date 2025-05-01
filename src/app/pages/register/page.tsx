'use client';
import { Form } from '@/components/Form'
export default function Register(){
    return(
        <main className='flex flex-col p-9 gap-4'>
            <h1 className='text-4xl text-wrap font-bold mb-5'>Seja bem-vindo, fã de e-sports!</h1>
            <Form />
        </main>
    )
}
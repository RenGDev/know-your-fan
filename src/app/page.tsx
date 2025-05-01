'use client'
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handleGoToRegister = () => {
    router.push('pages/register');
    }

	return (
	 <main>
        <button onClick={handleGoToRegister}>Register</button>
	 </main>
	);
}
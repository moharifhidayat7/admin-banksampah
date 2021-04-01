import Head from "next/head";

export default function login() {
    return (
        <section className='h-screen'>
            <Head>
                <title>Login - Bank Sampah Banyuwangi</title>
            </Head>
            <div className='mx-auto flex flex-col justify-center lg:items-center h-full'>
                <form
                    id='login'
                    className='w-96 bg-white shadow text-black py-8 px-2 sm:px-0'
                >
                    <div className='px-2 flex flex-col items-center justify-center'>
                        <h3 className='text-2xl sm:text-3xl xl:text-2xl font-bold leading-tight'>
                            Login
                        </h3>
                    </div>
                    <div className='mt-12 w-full px-2 sm:px-6'>
                        <div className='flex flex-col mt-5'>
                            <label
                                for='email'
                                className='text-lg font-semibold leading-tight'
                            >
                                Username
                            </label>
                            <input
                                required
                                id='username'
                                name='username'
                                className='h-10 px-2 w-full rounded border mt-2 focus:outline-none'
                                type='text'
                            />
                        </div>
                        <div className='flex flex-col mt-5'>
                            <label
                                for='password'
                                className='text-lg font-semibold fleading-tight'
                            >
                                Password
                            </label>
                            <input
                                required
                                id='password'
                                name='password'
                                className='h-10 px-2 w-full rounded border mt-2 focus:outline-none'
                                type='password'
                            />
                        </div>
                    </div>
                    <div className='pt-6 w-full flex justify-between px-2 sm:px-6'>
                        <div className='flex items-center'>
                            <input
                                id='rememberme'
                                className='w-3 h-3 mr-2'
                                type='checkbox'
                            />
                            <label for='rememberme' className='text-xs'>
                                Ingat Saya
                            </label>
                        </div>
                        <a className='text-xs' href='#'>
                            Lupa Password?
                        </a>
                    </div>
                    <div className='px-2 sm:px-6'>
                        <button className='focus:outline-none w-full bg-green-600 transition duration-150 ease-in-out hover:bg-green-700 rounded text-white px-8 py-3 text-sm mt-6'>
                            Login
                        </button>
                        <p className='mt-16 text-xs text-center hidden'>
                            Don’t Have An Account?
                            <a className='underline' href='#'>
                                Sign Up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}

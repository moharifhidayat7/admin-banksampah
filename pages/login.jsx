import Head from "next/head";
import { signIn, getSession, useSession } from "next-auth/client";
import { useState } from "react";
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'

export default function login() {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState("")

  const login = async (data) =>{
      const signin = await signIn('credentials', {redirect: false, ...data});
      console.log(signin)
      if(signin.ok){
        router.replace(router.asPath);
      }
      if(signin.error != null) {
        setError("Username atau Password Anda Salah!")
      }
  }

  return (
    <section className="h-screen">
      <Head>
        <title>Login - Bank Sampah Banyuwangi</title>
      </Head>
      <div className="mx-auto flex flex-col justify-center lg:items-center h-full">
        <form
          id="login"
          onSubmit={handleSubmit(login)}
          className="w-96 bg-white shadow text-black py-8 px-2 sm:px-0"
        >
          <div className="px-2 flex flex-col items-center justify-center">
            <h3 className="text-2xl sm:text-3xl xl:text-2xl font-bold leading-tight">
              Login
            </h3>
          </div>
          <div className="mt-12 w-full px-2 sm:px-6 flex flex-col space-y-2">
            {error && (<div>{error}</div>)}
            <div>
              <label className="text-lg font-semibold leading-tight">
                Username
              </label>
              <input
                id="username"
                name="username"
                ref={register({required: "Username Tidak Boleh Kosong!"})}
                className="h-10 px-2 w-full rounded border mt-2 focus:outline-none"
                type="text"
              />
              {errors.username && (
                <span className='text-xs text-red-500'>
                    * {errors.username.message}
                </span>)}
            </div>
            <div>
              <label className="text-lg font-semibold fleading-tight">
                Password
              </label>
              <input
                id="password"
                name="password"
                ref={register({required: "Password Tidak Boleh Kosong!"})}
                className="h-10 px-2 w-full rounded border mt-2 focus:outline-none"
                type="password"
              />
              {errors.password && (
                <span className='text-xs text-red-500'>
                    * {errors.password.message}
                </span>)}
            </div>
          </div>
          {/* <div className='pt-6 w-full flex justify-between px-2 sm:px-6'>
                        <div className='flex items-center'>
                            <input
                                id='rememberme'
                                className='w-3 h-3 mr-2'
                                type='checkbox'
                            />
                            <label className='text-xs'>
                                Ingat Saya
                            </label>
                        </div>
                        <a className='text-xs' href='#'>
                            Lupa Password?
                        </a>
                    </div> */}
          <div className="px-2 sm:px-6">
            <button type="submit"
              className="focus:outline-none w-full bg-green-600 transition duration-150 ease-in-out hover:bg-green-700 rounded text-white px-8 py-3 text-sm mt-6"
            >
              Login
            </button>
            <p className="mt-16 text-xs text-center hidden">
              Don’t Have An Account?
              <a className="underline" href="#">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    if (session.user.role == "gudang") {
        return {
            redirect: {
                destination: "/Admin/Gudang",
            },
        };
    } else if (session.user.role == "bendahara") {
        return {
            redirect: {
                destination: "/Admin/Bendahara",
            },
        };
    } else if (session.user.role == "penjualan") {
        return {
            redirect: {
                destination: "/Admin/Penjualan",
            },
        };
    } else if (session.user.role == "manager") {
        return {
            redirect: {
                destination: "/Admin/Manager",
            },
        };
    }
  }

  return {
    props: { session },
  };
}

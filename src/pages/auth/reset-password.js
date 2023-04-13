import Layout from '@layout/Layout';
import { useState } from 'react';
import ReseauxSocial from '@component/login/ReseauxSocial';
import { useRouter } from 'next/router';
import ResetPassword from '@component/login/ResetPassword';

const ResetPass = ()=>{
    const [modalOpen,setModalOpen] = useState(false);
    const router = useRouter();
    return (
      <Layout title="Reset-Password" description="Page auth Reset Password">
        <div className="bg-white">
          <div className="px-0 py-0 lg:py-0">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
                <div className="flex flex-col xl:flex-row">
                  <div className="w-full xl:w-3/12 lg:w-3/12 md:w-3/12"></div>

                  <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <ResetPassword setModalOpen={setModalOpen} />
                    <div className="my-8 after:bg-gray-100 before:bg-gray-100 fo10t-sans text-center font-medium">OR</div>

                    <ReseauxSocial />

                    <div className="text-center text-sm text-gray-900 mt-4">
                      <div className="text-gray-500 mt-2.5">
                        {"Not have a account ?"}
                        <button
                          onClick={() => {
                            router.push("/signup/signup01");
                          }}
                          className="text-gray-800 hover:text-primary font-bold mx-2"
                        >
                          {"Register"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-3/12 lg:w-3/12 md:w-3/12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
};

export default ResetPass;
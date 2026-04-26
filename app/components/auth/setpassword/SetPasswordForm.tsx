"use client"
import Link from "next/link"
import Button from "../../elements/Button"
import Input from "../../elements/Input"
import { useRouter } from "next/navigation"
import PasswordSucessfullyChangeModal from "./PasswordSucessfullyChangeModal"

interface SetPasswordFormProps {
    setIsModalOpen: (value: boolean) => void;
    isModalOpen: boolean;
}

const SetPasswordForm = ({setIsModalOpen,isModalOpen}: SetPasswordFormProps) => {
    const router=useRouter()
    const handleSubmit=(e:any)=>{
        e.preventDefault()
    }
  return (
   <div>
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            
            
            <Input
                label="New Password"
                type="password"
                placeholder="Enter your password"
                name="password"
            />
            
            <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
            />
           
            <div className="mt-5 w-full">
                <Button type="submit" className='py-2! md:py-4!' onClick={()=>setIsModalOpen(true)}>
                    Continue
                </Button>
            </div>
            

             </form>

            <PasswordSucessfullyChangeModal 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen}
            />
        </div>
  )
}

export default SetPasswordForm
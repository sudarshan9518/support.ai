import { getSession } from '@/lib/getSession'
import React from 'react'
import DashboardClient from './../../components/DashboardClient';

const page = async () => {

 const session = await getSession()


  return (
   <>
    <div>
        <DashboardClient ownerId={session?.user?.id!}/>
    </div>
   </>
  )
}

export default page

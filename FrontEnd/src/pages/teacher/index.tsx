import NavigationTeacher from '@/components/navigationTeacher'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='m-4'>
      <NavigationTeacher/>
      <div>
        <div className='py-4 flex flex-row justify-between'>
          <h1 className='text-3xl'>Lessons Archive</h1>
        </div>
        <div>
          List of the generated lessons so far here....
        </div>
      </div>
    </div>
  )
}

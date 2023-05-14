import NavigationStudent from '@/components/navigationStudent'
import Link from 'next/link'

export default function index() {
  return (
    <div className='m-4'>
      <NavigationStudent/>
      <div>
        <div className='py-4 flex flex-row justify-between'>
          <h1 className='text-3xl'>Lessons Archive</h1>
        </div>
        <div>
          List of the lessons teacher has assigned the student so far...
        </div>
      </div>
    </div>
  )
}

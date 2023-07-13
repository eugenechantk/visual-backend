import React from 'react'
import DraggableFieldTag from './DraggableFieldTag'

export default function DatabasePanelContainer({className, ...props}: {className?: string}) {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <div className='absolute bottom-0 min-w-full'>
      <button className='px-2 py-1 bg-white border-t border-x border-gray-200' onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'}</button>
      <div className={`w-full h-[200px] overflow-y-scroll bg-white border-t border-gray-200 ${className} ${isOpen ? 'visible' : 'hidden'}`}>
        <div className='flex flex-col gap-2 m-4'>
          <DraggableFieldTag id='first_name' name='First name' />
        </div>
      </div>
    </div>
  )
}

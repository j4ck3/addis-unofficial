import React from 'react';


const TextArea: React.FC = () => {
  return (
    <>
        <div className="grid grid-cols-2 p-3">
            <textarea className='border rounded p-1 h-6 grid-col-2' rows={4} name='text'></textarea>
        </div>
    </> 
  );
}

export default TextArea;
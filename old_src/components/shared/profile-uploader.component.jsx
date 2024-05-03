/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ProfileUploader = ({ fieldChange, mediaUrl }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      // setFileUrl(acceptedFiles[0]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  );

  // console.log(file);
  // console.log(fileUrl);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className='cursor-pointer' />

      {fileUrl ? (
        <div className='group relative w-20 cursor-pointer flex-center gap-4'>
          <img
            src={fileUrl}
            alt='image'
            className='w-full rounded-full object-cover object-top'
          />
          <div className='absolute top-0 left-0 w-full h-full items-center justify-center rounded-full hidden group-hover:bg-[#00000070] group-hover:flex'>
            <p className='border border-slate-100 rounded-sm bg-transparent group-hover:bg-transparent text-white text-sm p-1'>
              Upload
            </p>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center w-full'>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg
                className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 16'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                />
              </svg>
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

{
  /* <div className='cursor-pointer flex-center gap-4'>
          <Upload size={20} />
          <h3 className='text-md text-light-2 my-2'>Drag photo here</h3>
          <p className='text-sm text-dark-gray mb-2'>SVG, PNG, JPG, JPEG</p>
          <Button type='button'>Select from computer</Button>
        </div> */
}

export default ProfileUploader;

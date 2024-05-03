import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from '../ui/button';
import { Upload } from 'lucide-react';

const FileUploader = ({ fieldChange, mediaUrl }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      // setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'
    >
      <input {...getInputProps()} className='cursor-pointer' />

      {fileUrl ? (
        <div className='cursor-pointer flex-center gap-4'>
          <img
            src={fileUrl}
            alt='image'
            className='h-24 w-24 rounded-full object-cover object-top'
          />
          <p className='text-primary-500 small-regular md:bbase-semibold'>
            Change profile photo
          </p>
        </div>
      ) : (
        <div className='cursor-pointer flex-center gap-4'>
          <Upload size={20} />
          <h3 className='text-md text-light-2 my-2'>Drag photo here</h3>
          <p className='text-sm text-dark-gray mb-2'>SVG, PNG, JPG, JPEG</p>
          <Button type='button'>Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;

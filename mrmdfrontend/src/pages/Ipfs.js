import React, { useCallback, useState } from 'react';
import { useStorageUpload, MediaRenderer } from '@thirdweb-dev/react';
import { useDropzone } from 'react-dropzone';

const Ipfs = () => {
    const [uris, setUris] = useState([]);
    const { mutateAsync: upload } = useStorageUpload();

    const onDrop = useCallback(async (acceptedFiles) => {
        const _uris = await upload({ data: acceptedFiles });
        setUris(_uris);
    }, [upload]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    
    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='addContactTriggerButton1'><button className='addContactTriggerButton'>Upload Report</button></div>
            </div>
            <div>
                {uris.map((uri) => (
                    <div className='ipfs-upload' key={uri}>
                        <MediaRenderer src={uri} alt="Image" width='100%' />
                        <div className='ipfs-uri'><a href={uri} target='_blank'>Click Here to Generate Report from IPFS</a></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ipfs;
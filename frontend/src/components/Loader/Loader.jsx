import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <TailSpin
                height="80"
                width="80"
                color="#00BFFF"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
            />
        </div>
    );
};

export default Loader;

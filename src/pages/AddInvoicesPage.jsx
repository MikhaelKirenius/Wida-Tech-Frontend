import React from 'react';
import InvoiceForm from '../components/Form';
import MainContainer from '../components/container/MainContainer';
const AddInvoicesPage = () => {
    return (
        <MainContainer>
            <div className='flex justify-center items-center h-full'>
                <div className='text-center'>
                    <h1 className='font-bold text-2xl my-4'>Add Invoice Form</h1>
                    <div>
                        <InvoiceForm />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default AddInvoicesPage;
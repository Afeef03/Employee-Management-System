import Button from '@mui/material/Button';

const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];

export default function GroupSizesColors() {
  return (
    <div className='flex gap-5 items-center'>
       <button className='cursor-pointer p-2 bg-blue-100 text-blue-800 font-bold rounded-md'>Admin</button>
    </div>
  );
}

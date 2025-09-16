import InstructionsPage from '../InstructionsPage';

export default function InstructionsPageExample() {
  const handleAgree = () => {
    console.log('User agreed to terms');
  };

  return <InstructionsPage onAgree={handleAgree} />;
}
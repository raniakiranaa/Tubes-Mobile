import BottomNavbar from './BottomNavbar'; // Adjust the import path as needed
export { CustomHeader } from './CustomHeader'

export default function MainComponent() {
  // Set isAdmin to true or false based on whether the user is an admin
  const isAdmin = true; // Set to true if user is an admin, false otherwise

  return (
    <BottomNavbar isAdmin={isAdmin} />
  );
}
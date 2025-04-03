import { Container, WelcomeMessage } from "@/components";

export const metadata = {
  title: "Unos y Otros - Dashboard",
};

const Welcome = () => {
  return (
    <Container>
      <WelcomeMessage />
    </Container>
  );
};

export default Welcome;

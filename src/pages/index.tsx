import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the trivia welcome page
    router.push("/trivia");
  }, [router]);

  return (
    <div>
      <p>Redirecting to the trivia game...</p>
    </div>
  );
}

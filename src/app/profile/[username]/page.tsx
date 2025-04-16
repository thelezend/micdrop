import ProfileClient from "@/components/profileClient";

/**
 * Profile page component
 * Server component that renders the client-side ProfileClient component
 * Shows user profile information, past rooms, and followers/following
 */
export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  return <ProfileClient username={username} />;
}

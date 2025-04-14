import RoomClient from "@/components/roomClient";

/**
 * Live Room page component
 * Displays a voice room with speakers, listeners, controls, and chat
 */
export default async function RoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const roomId = (await params).id;

  return <RoomClient classname="" roomId={roomId} />;
}

import dynamic from "next/dynamic";

//internal import
const GroupDetailScreen = dynamic(() => import("./../../component/group_details/GroupDetailScreen"), { ssr: false });

export default function Index() {
  return <GroupDetailScreen />;
}
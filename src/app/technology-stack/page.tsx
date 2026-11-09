import { technologyGroups } from "@/data/technologies";
import { stackVerifiedAt } from "@/data/technology-releases";
import { TechnologyLibrary } from "./technology-library";
export const metadata = { title: "Technology stack" };
export default function Page() {
  return (
    <TechnologyLibrary groups={technologyGroups} verifiedAt={stackVerifiedAt} />
  );
}

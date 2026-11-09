import Link from "next/link";
import { resources } from "@/data/resources";
import { topicById } from "@/data/curriculum";
import { PageHeading } from "@/components/ui";

export const metadata = { title: "Curriculum references" };
export default function ReferencesPage() {
  return (
    <>
      <PageHeading
        title="Curriculum references"
        description="Open each source from its lesson or use this index to find the linked topic."
      />
      <section className="content-card">
        <ul className="plain-list">
          {resources.map((source) => (
            <li id={source.id} key={source.id}>
              <strong>{source.title}</strong>
              {" · "}
              {source.relatedTopicIds.map((id) => (
                <Link
                  className="text-link"
                  href={"/learn/" + topicById[id].slug + "#resources"}
                  key={id}
                >
                  {topicById[id].title}
                </Link>
              ))}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

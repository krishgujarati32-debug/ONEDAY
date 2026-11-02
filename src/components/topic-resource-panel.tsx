"use client";
import { resources } from "@/data/resources";
import { topicResourceGroups } from "@/lib/resource-learning";
import { ResourceCard } from "./resource-card";
export function TopicResourcePanel({ topicId }: { topicId: string }) {
  return (
    <>
      {topicResourceGroups(resources, topicId).map(([label, entries]) => (
        <section className="resource-topic-group" key={label}>
          <h3>{label}</h3>
          {label === "Read later" && (
            <p className="muted">
              These related guides become useful at the phase and prerequisites
              shown below. Keep them as references until then.
            </p>
          )}
          <div className="resources-grid compact-grid">
            {entries.map(({ resource, moments }) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                moments={moments}
                showUpcoming
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

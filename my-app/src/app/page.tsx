"use client";

import { FetchPeopleResponse } from "@/services/PeopleService";
import { PeopleService, Person } from "@/services/PeopleService";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [people, setPeople] = useState<Person[]>();
  const [previous, setPrevious] = useState<string | undefined>();
  const [next, setNext] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = useCallback((url?: string) => {
    if (loading) return;
    setLoading(true);
    PeopleService.fetchPeople(url)
      .then(onResponseDone)
      .finally(() => setLoading(false));
  }, []);

  const onResponseDone = (response: FetchPeopleResponse | null) => {
    setPeople(response?.data ?? []);
    setNext(response?.nextPage);
    setPrevious(response?.previousPage);
  };

  if (loading) return <div>Loading...</div>;

  if (!people) return <div>Error</div>;

  return (
    <div>
      <ul>
        {people.map((p, idx) => (
          <li key={`person-${idx}`}>{p.name}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => fetchPeople(previous)}
          disabled={!previous || loading}
        >
          Previous
        </button>
      </div>
      <div>
        <button onClick={() => fetchPeople(next)} disabled={!next || loading}>
          Next
        </button>
      </div>
    </div>
  );
}

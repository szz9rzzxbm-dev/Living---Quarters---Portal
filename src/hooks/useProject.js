import { client, project, team, stages, appliances, finishes, documents, payments, affiliates, messages } from '../lib/mockData'

/**
 * Returns the current client's project. Frontend-only: serves mock data.
 * Will be replaced by a Supabase query scoped to the authenticated client
 * (RLS: project.client_id = auth.uid()).
 */
export function useProject() {
  return {
    loading: false,
    error: null,
    client,
    project,
    team,
    stages,
    appliances,
    finishes,
    documents,
    payments,
    affiliates,
    messages,
  }
}

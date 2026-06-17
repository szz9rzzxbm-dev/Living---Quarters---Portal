import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import * as data from '../lib/mockData'

/**
 * Returns the current client's project and all related records.
 *
 * Frontend-only: serves mock data, but scoped to the authenticated user the way
 * the live version will be. With Supabase this becomes a query (or set of
 * queries) filtered by the signed-in client under RLS:
 *   project.client_id = auth.uid()
 */
export function useProject() {
  const { user } = useAuth()
  const [state, setState] = useState({ loading: true, error: null, project: null })

  useEffect(() => {
    let active = true
    // Simulate an async fetch so consumers render real loading states.
    const t = setTimeout(() => {
      if (!active) return
      setState({
        loading: false,
        error: null,
        client: data.client,
        project: data.project,
        team: data.team,
        stages: data.stages,
        appliances: data.appliances,
        finishes: data.finishes,
        documents: data.documents,
        payments: data.payments,
        affiliates: data.affiliates,
        messages: data.messages,
      })
    }, 150)
    return () => {
      active = false
      clearTimeout(t)
    }
  }, [user?.id])

  return state
}

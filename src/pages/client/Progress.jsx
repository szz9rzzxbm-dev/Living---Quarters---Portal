import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import ProgressTrack from '../../components/ProgressTrack'
import Loader from '../../components/Loader'
import { useProject } from '../../hooks/useProject'

export default function Progress() {
  const { loading, project, stages } = useProject()

  if (loading) {
    return (
      <div className="view">
        <Loader label="Loading your progress" />
      </div>
    )
  }

  return (
    <div className="view">
      <PageHeader eyebrow={`Project ${project.reference}`} heading={<>Where your <em>kitchen</em> is at</>} />
      <Panel title="The journey" tag={`Stage ${project.stage} of 8`}>
        <ProgressTrack steps={stages} />
      </Panel>
    </div>
  )
}

import PageHeader from '../../components/PageHeader'
import Panel from '../../components/Panel'
import ProgressTrack from '../../components/ProgressTrack'
import { project, stages } from '../../lib/mockData'

export default function Progress() {
  return (
    <div className="view">
      <PageHeader eyebrow={`Project ${project.reference}`} heading={<>Where your <em>kitchen</em> is at</>} />
      <Panel title="The journey" tag={`Stage ${project.stage} of 8`}>
        <ProgressTrack steps={stages} />
      </Panel>
    </div>
  )
}

import { Composition, Folder } from 'remotion';
import { IndustriesOverview } from './compositions/IndustriesOverview';
import { IndustryShowcase } from './compositions/IndustryShowcase';
import { RevenueTriad } from './compositions/RevenueTriad';
import { LeadGenWebsites } from './compositions/LeadGenWebsites';
import { LeadGenFactory } from './compositions/LeadGenFactory';
import { LeadReactor } from './compositions/LeadReactor';
import { LeadReactorSpeed } from './compositions/LeadReactorSpeed';
import { LeadReactorChannels } from './compositions/LeadReactorChannels';
import { PrivateAssistant } from './compositions/PrivateAssistant';
import { PrivateAssistantSilo } from './compositions/PrivateAssistantSilo';
import { PrivateAssistantSkills } from './compositions/PrivateAssistantSkills';
import { OpenClawHub } from './compositions/OpenClawHub';
import { OpenClawVsChatGPT } from './compositions/OpenClawVsChatGPT';
import { OpenClawSetup } from './compositions/OpenClawSetup';
import { Consultation } from './compositions/Consultation';
import { ConsultationGap } from './compositions/ConsultationGap';
import { Training } from './compositions/Training';
import { TrainingResults } from './compositions/TrainingResults';

export const RemotionRoot = () => {
  const commonProps = {
    durationInFrames: 600,
    fps: 30,
    width: 1080,
    height: 1080,
  };

  return (
    <>
    <Folder name="Industries">
      <Composition durationInFrames={750}  fps={30} width={1080} height={1080} id="industries-overview" component={IndustriesOverview} defaultProps={{}} />
      <Composition durationInFrames={1200} fps={30} width={1080} height={1080} id="industry-showcase"   component={IndustryShowcase}   defaultProps={{}} />
    </Folder>
    <Folder name="Products">
      <Composition
        {...commonProps}
        id="revenue-triad"
        component={RevenueTriad}
        defaultProps={{}}
      />
      <Composition
        {...commonProps}
        id="lead-gen-websites"
        component={LeadGenWebsites}
        defaultProps={{}}
      />
      <Composition
        {...commonProps}
        id="lead-gen-factory"
        component={LeadGenFactory}
        defaultProps={{}}
      />
      <Composition {...commonProps} id="lead-reactor" component={LeadReactor} defaultProps={{}} />
      <Composition {...commonProps} id="lead-reactor-speed" component={LeadReactorSpeed} defaultProps={{}} />
      <Composition {...commonProps} id="lead-reactor-channels" component={LeadReactorChannels} defaultProps={{}} />
      <Composition
        {...commonProps}
        id="private-assistant"
        component={PrivateAssistant}
        defaultProps={{}}
      />
      <Composition {...commonProps} id="private-assistant-silo" component={PrivateAssistantSilo} defaultProps={{}} />
      <Composition {...commonProps} id="private-assistant-skills" component={PrivateAssistantSkills} defaultProps={{}} />
      <Composition {...commonProps} id="openclaw-hub" component={OpenClawHub} defaultProps={{}} />
      <Composition {...commonProps} id="openclaw-vs-chatgpt" component={OpenClawVsChatGPT} defaultProps={{}} />
      <Composition {...commonProps} id="openclaw-setup" component={OpenClawSetup} defaultProps={{}} />
      <Composition {...commonProps} id="consultation" component={Consultation} defaultProps={{}} />
      <Composition {...commonProps} id="consultation-gap" component={ConsultationGap} defaultProps={{}} />
      <Composition {...commonProps} id="training" component={Training} defaultProps={{}} />
      <Composition {...commonProps} id="training-results" component={TrainingResults} defaultProps={{}} />
    </Folder>
    </>
  );
};

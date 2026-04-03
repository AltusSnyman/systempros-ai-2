import { Composition, Folder } from 'remotion';
import { RevenueTriad } from './compositions/RevenueTriad';
import { LeadGenWebsites } from './compositions/LeadGenWebsites';
import { LeadGenFactory } from './compositions/LeadGenFactory';
import { LeadReactor } from './compositions/LeadReactor';
import { LeadReactorSpeed } from './compositions/LeadReactorSpeed';
import { LeadReactorChannels } from './compositions/LeadReactorChannels';
import { PrivateAssistant } from './compositions/PrivateAssistant';
import { Consultation } from './compositions/Consultation';
import { Training } from './compositions/Training';

export const RemotionRoot = () => {
  const commonProps = {
    durationInFrames: 600,
    fps: 30,
    width: 1080,
    height: 1080,
  };

  return (
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
      <Composition
        {...commonProps}
        id="consultation"
        component={Consultation}
        defaultProps={{}}
      />
      <Composition
        {...commonProps}
        id="training"
        component={Training}
        defaultProps={{}}
      />
    </Folder>
  );
};

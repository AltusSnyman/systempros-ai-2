import { Player } from '@remotion/player';
import { IndustriesOverview } from '../remotion/compositions/IndustriesOverview';
import { IndustryShowcase, type IndustryShowcaseProps } from '../remotion/compositions/IndustryShowcase';
import { RevenueTriad } from '../remotion/compositions/RevenueTriad';
import { LeadGenWebsites } from '../remotion/compositions/LeadGenWebsites';
import { LeadGenFactory } from '../remotion/compositions/LeadGenFactory';
import { LeadReactor } from '../remotion/compositions/LeadReactor';
import { LeadReactorSpeed } from '../remotion/compositions/LeadReactorSpeed';
import { LeadReactorChannels } from '../remotion/compositions/LeadReactorChannels';
import { PrivateAssistant } from '../remotion/compositions/PrivateAssistant';
import { PrivateAssistantSilo } from '../remotion/compositions/PrivateAssistantSilo';
import { PrivateAssistantSkills } from '../remotion/compositions/PrivateAssistantSkills';
import { OpenClawHub } from '../remotion/compositions/OpenClawHub';
import { OpenClawVsChatGPT } from '../remotion/compositions/OpenClawVsChatGPT';
import { OpenClawSetup } from '../remotion/compositions/OpenClawSetup';
import { Consultation } from '../remotion/compositions/Consultation';
import { ConsultationGap } from '../remotion/compositions/ConsultationGap';
import { Training } from '../remotion/compositions/Training';
import { TrainingResults } from '../remotion/compositions/TrainingResults';

const compositions = {
  'industries-overview': IndustriesOverview,
  'industry-showcase':   IndustryShowcase,
  'revenue-triad':       RevenueTriad,
  'lead-gen-websites':   LeadGenWebsites,
  'lead-gen-factory':    LeadGenFactory,
  'lead-reactor':        LeadReactor,
  'lead-reactor-speed':  LeadReactorSpeed,
  'lead-reactor-channels': LeadReactorChannels,
  'private-assistant':   PrivateAssistant,
  'private-assistant-silo':    PrivateAssistantSilo,
  'private-assistant-skills':  PrivateAssistantSkills,
  'openclaw-hub':        OpenClawHub,
  'openclaw-vs-chatgpt': OpenClawVsChatGPT,
  'openclaw-setup':      OpenClawSetup,
  'consultation':        Consultation,
  'consultation-gap':    ConsultationGap,
  'training':            Training,
  'training-results':    TrainingResults,
} as const;

const durations: Partial<Record<keyof typeof compositions, number>> = {
  'industries-overview': 750,
  'industry-showcase':  1200,
};

type CompositionId = keyof typeof compositions;

type Props = {
  id: CompositionId;
  className?: string;
  inputProps?: IndustryShowcaseProps;
};

export const ProductVideoPlayer = ({ id, className, inputProps }: Props) => {
  const Comp = compositions[id] as React.ComponentType<typeof inputProps>;
  const durationInFrames = durations[id] ?? 600;

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
      }}
      className={className}
    >
      <Player
        component={Comp}
        inputProps={inputProps ?? {}}
        durationInFrames={durationInFrames}
        fps={30}
        compositionWidth={1080}
        compositionHeight={1080}
        style={{ width: '100%', height: '100%' }}
        autoPlay
        loop
        controls={false}
        clickToPlay={false}
        spaceKeyToPlayOrPause={false}
      />
    </div>
  );
};

export default ProductVideoPlayer;

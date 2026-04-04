import { Player } from '@remotion/player';
import { RevenueTriad } from '../remotion/compositions/RevenueTriad';
import { LeadGenWebsites } from '../remotion/compositions/LeadGenWebsites';
import { LeadGenFactory } from '../remotion/compositions/LeadGenFactory';
import { LeadReactor } from '../remotion/compositions/LeadReactor';
import { LeadReactorSpeed } from '../remotion/compositions/LeadReactorSpeed';
import { LeadReactorChannels } from '../remotion/compositions/LeadReactorChannels';
import { PrivateAssistant } from '../remotion/compositions/PrivateAssistant';
import { PrivateAssistantSilo } from '../remotion/compositions/PrivateAssistantSilo';
import { PrivateAssistantSkills } from '../remotion/compositions/PrivateAssistantSkills';
import { Consultation } from '../remotion/compositions/Consultation';
import { ConsultationGap } from '../remotion/compositions/ConsultationGap';
import { Training } from '../remotion/compositions/Training';
import { TrainingResults } from '../remotion/compositions/TrainingResults';

const compositions = {
  'revenue-triad': RevenueTriad,
  'lead-gen-websites': LeadGenWebsites,
  'lead-gen-factory': LeadGenFactory,
  'lead-reactor': LeadReactor,
  'lead-reactor-speed': LeadReactorSpeed,
  'lead-reactor-channels': LeadReactorChannels,
  'private-assistant': PrivateAssistant,
  'private-assistant-silo': PrivateAssistantSilo,
  'private-assistant-skills': PrivateAssistantSkills,
  'consultation': Consultation,
  'consultation-gap': ConsultationGap,
  'training': Training,
  'training-results': TrainingResults,
} as const;

type CompositionId = keyof typeof compositions;

type Props = {
  id: CompositionId;
  className?: string;
};

export const ProductVideoPlayer = ({ id, className }: Props) => {
  const Comp = compositions[id];

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
        inputProps={{}}
        durationInFrames={600}
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

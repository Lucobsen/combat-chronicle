import { createFileRoute } from '@tanstack/react-router';
import { EncounterList } from '../components/Encounters/EncounterList/EncounterList';

export const Route = createFileRoute('/')({
  component: () => <EncounterList />,
});

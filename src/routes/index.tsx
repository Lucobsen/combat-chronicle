import { createFileRoute } from '@tanstack/react-router';
import { EncounterList } from '../components/Encounters/EncounterList/EncounterList';

const Index = () => <EncounterList />;

export const Route = createFileRoute('/')({
  component: Index,
});

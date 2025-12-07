import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import BlindIcon from '@mui/icons-material/Blind';
import BoltIcon from '@mui/icons-material/Bolt';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HearingDisabledIcon from '@mui/icons-material/HearingDisabled';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import HighlightIcon from '@mui/icons-material/Highlight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LinkIcon from '@mui/icons-material/Link';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import ScienceIcon from '@mui/icons-material/Science';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import { useTheme } from '@mui/material';
import type { JSX } from 'react';

type Condition = {
  label: string;
  icon: JSX.Element;
};

export const useConditions = (): Condition[] => {
  const { palette } = useTheme();

  return [
    {
      label: 'BLINDED',
      icon: (
        <BlindIcon
          sx={{
            fontSize: 16,
            color: palette.mode === 'light' ? '#000' : '#fff',
          }}
        />
      ),
    },
    {
      label: 'CHARMED',
      icon: (
        <FavoriteIcon sx={{ fontSize: 16, color: palette.secondary.main }} />
      ),
    },
    {
      label: 'DEAFENED',
      icon: <HearingDisabledIcon sx={{ fontSize: 16, color: '#7d7d7d' }} />,
    },
    {
      label: 'EXHAUSTED',
      icon: (
        <HeartBrokenIcon sx={{ fontSize: 16, color: palette.error.main }} />
      ),
    },
    {
      label: 'FRIGHTENED',
      icon: <CoronavirusIcon sx={{ fontSize: 16, color: '#7400d4' }} />,
    },
    {
      label: 'GRAPPLED',
      icon: (
        <SignLanguageIcon sx={{ fontSize: 16, color: palette.success.main }} />
      ),
    },
    {
      label: 'INCAPACITATED',
      icon: (
        <PsychologyAltIcon sx={{ fontSize: 16, color: palette.primary.dark }} />
      ),
    },
    {
      label: 'INVISIBLE',
      icon: (
        <PeopleOutlineIcon
          sx={{ fontSize: 16, color: palette.primary.light }}
        />
      ),
    },
    {
      label: 'PARALYZED',
      icon: <BoltIcon sx={{ fontSize: 16, color: '#dbb435' }} />,
    },
    {
      label: 'PETRIFIED',
      icon: (
        <AccessibilityIcon
          sx={{
            fontSize: 16,
            color:
              palette.mode === 'light' ? palette.grey[800] : palette.grey[400],
          }}
        />
      ),
    },
    {
      label: 'POISONED',
      icon: <ScienceIcon sx={{ fontSize: 16, color: palette.success.light }} />,
    },
    {
      label: 'PRONE',
      icon: <KeyboardArrowDownIcon sx={{ fontSize: 16, color: '#de8410' }} />,
    },
    {
      label: 'RESTRAINED',
      icon: <LinkIcon sx={{ fontSize: 16, color: '#850922' }} />,
    },
    {
      label: 'STUNNED',
      icon: <HighlightIcon sx={{ fontSize: 16, color: '#c3ff00' }} />,
    },
    {
      label: 'UNCONCIOUS',
      icon: (
        <AirlineSeatIndividualSuiteIcon
          sx={{ fontSize: 16, color: '##572203' }}
        />
      ),
    },
  ];
};

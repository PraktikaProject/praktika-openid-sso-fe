import { useLocale, useTranslations } from 'next-intl';

import { SelectItem } from '@/components/ui/select';

import { locales } from '@/config';

import LocaleSwitcerSelect from './LocaleSwitcerSelect';

export default function LocaleSwitcer() {
  const t = useTranslations('LocaleSwitcer');
  const currentLocale = useLocale();

  return (
    <LocaleSwitcerSelect label={t('label')} defaultValue={currentLocale}>
      {locales.map((curr: string) => (
        <SelectItem key={curr} value={curr}>
          {t('locale', { locale: curr })}
        </SelectItem>
      ))}
    </LocaleSwitcerSelect>
  );
}

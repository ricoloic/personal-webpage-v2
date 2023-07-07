import * as React from 'react';
import { Card, Description, Link, Title } from './Feature.styles';

interface FeatureProps {
  title: string;
  url: string;
  description?: string;
}
export default function Feature({
  title,
  url,
  description = '',
}: FeatureProps) {
  return (
    <Card>
      <Title>
        <Link href={url} target="_blank">
          {title}
        </Link>
      </Title>
      <Description>{description}</Description>
    </Card>
  );
}

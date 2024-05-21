import { Stack, HStack, IconButton, Button } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { PaginationProps } from './paginate';
import { Fragment } from 'react';

const Pagination = ({
  total,
  pageSize,
  page,
  onChange,
  margin = 1,
  size = 'md',
  selectedVariant = 'solid',
  variant = 'outline',
  prevIcon = <ChevronLeftIcon />,
  nextIcon = <ChevronRightIcon />,
  colorScheme = 'gray',
  fontWeight = 'light',
  borderRadius = 'sm',
  ...rest
}: PaginationProps) => {
  const firstPage = 1;
  const numberOfPages = Math.ceil(total / pageSize);

  const handlePageClick = (page: number): void => {
    // handle Unexpected Case - greater than length || <=0
    let newPage = page > numberOfPages ? numberOfPages : page <= 0 ? firstPage : page;
    onChange(newPage);
  };

  const shouldRender = (idx: number) => {
    return idx + 1 == page || Math.abs(idx + 1 - page) <= margin || idx + 1 === numberOfPages || idx + 1 === firstPage;
  };

  const shouldRenderEllipis = (idx: number) => {
    return Math.abs(idx + 1 - page) === margin + 1;
  };

  return (
    <Stack p={5}>
      <HStack role="navigation">
        <IconButton
          aria-label="previous"
          fontWeight={fontWeight}
          borderRadius={borderRadius}
          icon={prevIcon}
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(page - 1);
          }}
          size={size}
          variant={variant}
          colorScheme={colorScheme}
        />
        {Array(numberOfPages)
          .fill(0)
          .map((_, idx) => {
            return shouldRender(idx) ? (
              <Button
                key={`render${idx}`}
                {...rest}
                fontWeight={fontWeight}
                borderRadius={borderRadius}
                size={size}
                variant={idx + 1 === page ? selectedVariant : variant}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(idx + 1);
                }}
                colorScheme={colorScheme}
              >
                {idx + 1}
              </Button>
            ) : shouldRenderEllipis(idx) ? (
              <Button
                key={`ellipis${idx}`}
                {...rest}
                fontWeight={fontWeight}
                borderRadius={borderRadius}
                size={size}
                pointerEvents="none"
                variant={variant}
                colorScheme={colorScheme}
              >
                ...
              </Button>
            ) : (
              <Fragment key={idx}></Fragment>
            );
          })}

        <IconButton
          aria-label="next"
          fontWeight={fontWeight}
          borderRadius={borderRadius}
          icon={nextIcon}
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(page + 1);
          }}
          size={size}
          variant={variant}
          colorScheme={colorScheme}
        />
      </HStack>
    </Stack>
  );
};

export default Pagination;

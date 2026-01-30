import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner from './Banner';
import { useGetListBannersQuery } from 'store/banner/bannerApiSlice';

// Mock the hook
jest.mock('store/banner/bannerApiSlice', () => ({
  useGetListBannersQuery: jest.fn(),
}));

// Mock Loading component to avoid Iconify import issues in tests
jest.mock('layouts/sharedComponents/Loading', () => () => <div>Loading...</div>);

describe('Banner Component', () => {
  it('renders slides when data is fetched', () => {
    const mockData = {
      data: [
        { id: 101, url: 'image1.jpg', fileName: 'Image 1' },
        { id: 102, url: 'image2.jpg', fileName: 'Image 2' },
      ],
    };

    (useGetListBannersQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });

    render(<Banner />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    expect(images[1]).toHaveAttribute('src', 'image2.jpg');
  });
});

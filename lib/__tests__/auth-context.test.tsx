import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAuth, AuthProvider } from '../auth-context';

// Mock Supabase to avoid trying to connect to a real backend or looking for env vars
jest.mock('../supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
      signInWithOtp: jest.fn(),
      verifyOtp: jest.fn(),
      signOut: jest.fn()
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
      upsert: jest.fn().mockResolvedValue({ data: null, error: null }),
      delete: jest.fn().mockReturnThis()
    })
  }
}));

describe('useAuth hook', () => {
  beforeEach(() => {
    // Clear console errors to keep test output clean since we expect an error
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws an error when used outside of AuthProvider', () => {
    const TestComponent = () => {
      useAuth();
      return <div>Should not render</div>;
    };

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');
  });

  it('provides context values when used inside AuthProvider', () => {
    const TestComponent = () => {
      const auth = useAuth();
      // To test the context without interacting with all parts of the app
      return (
        <div data-testid="auth-context">
          {auth.isLoading ? 'Loading' : 'Ready'}
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-context')).toBeDefined();
    // Using string matching since it starts as loading and might transition to ready
    expect(screen.getByTestId('auth-context').textContent).toMatch(/Loading|Ready/);
  });
});

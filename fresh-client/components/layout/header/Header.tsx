export const Header = () => {
  return (
    <header class="w-full px-8 py-4 bg-brand-black flex flex-row items-center justify-center relative mb-[4px]">
      <h1 class="text-2xl font-bold text-brand-offWhite rounded-full border-2 border-offWhite p-2">
        DeNotes
      </h1>
      <div class="absolute bottom-[-4px] left-0 w-full h-[4px] bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary" />
    </header>
  );
};

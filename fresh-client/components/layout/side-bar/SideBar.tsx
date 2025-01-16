import { File, FileWarning, Folder } from "https://esm.sh/lucide-preact";
import { Folder as FolderType } from "../../../types/index.ts";

type SideBarProps = {
  folders: FolderType[];
};

export const SideBar = ({ folders }: SideBarProps) => {
  return (
    <div class="bg-brand-offBlack border-r-[1px] border-r-brand-offWhite/25 overflow-y-scroll w-1/5 p-2 divide-y-[1px] divide-brand-offWhite/25">
      {folders.map(({ folder_id, folder_name, notes }) => (
        <div class="w-full flex flex-col gap-y-2" key={`folder-${folder_id}`}>
          <div class="w-full flex flex-row items-center gap-x-2">
            <Folder size="12" color="white" />
            <p class="font-bold text-sm">{folder_name}</p>
          </div>
          <div class="flex flex-col gap-y-2 pl-4">
            {notes.map(({ note_id, note_title }) => (
              <div class="w-full flex flex-row items-center gap-x-2" key={`note-${note_id}`}>
                <File size="12" color="white" />
                <p class="ffont-bold text-xs">{note_title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


import { useAuth } from '@/contexts/auth';
import { Link } from 'react-router-dom';
import { School, GraduationCap, Users, Shield, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const SchoolDropdown = () => {
  const { userProfile } = useAuth();

  // Check if the user is a school staff member (teacher or admin)
  const isSchoolStaff = userProfile?.user_type === 'teacher' || 
                       userProfile?.user_type === 'admin';

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2">
            <School className="h-4 w-4" />
            Schools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4">
              <div className="grid grid-cols-1 gap-2">
                {/* General School Links */}
                <Link
                  to="/school-guide"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "justify-start flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                  )}
                >
                  <GraduationCap className="h-4 w-4" />
                  <div>
                    <div className="font-medium">School Guide</div>
                    <div className="text-sm text-muted-foreground">Learn about our school integration</div>
                  </div>
                </Link>

                <Link
                  to="/school-integration"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "justify-start flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                  )}
                >
                  <School className="h-4 w-4" />
                  <div>
                    <div className="font-medium">School Integration</div>
                    <div className="text-sm text-muted-foreground">How schools can partner with us</div>
                  </div>
                </Link>

                {isSchoolStaff && (
                  <>
                    <Link
                      to="/school-dashboard"
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "justify-start flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                      )}
                    >
                      <Shield className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Admin Dashboard</div>
                        <div className="text-sm text-muted-foreground">Manage school settings and accounts</div>
                      </div>
                    </Link>

                    <Link
                      to="/counselor-dashboard"
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "justify-start flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                      )}
                    >
                      <Users className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Counselor Tools</div>
                        <div className="text-sm text-muted-foreground">Student guidance and career planning</div>
                      </div>
                    </Link>

                    <Link
                      to="/teacher-dashboard"
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "justify-start flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                      )}
                    >
                      <GraduationCap className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Teacher Portal</div>
                        <div className="text-sm text-muted-foreground">Class management and assignments</div>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
